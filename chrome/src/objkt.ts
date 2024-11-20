import RateKeeper from "rate-keeper";

const objktEndPoint: string = Object.freeze("https://data.objkt.com/v3/graphql");
const RATE_LIMIT_ID = 21337;
const RATE_LIMIT = 600;

interface IUserInfo {
    alias: string
    address: string
}

interface IHolders {
    data: {
        holder: IUserInfo[]
    }
}

function GetXUserAddressQuery(xLinks: string[]): object {
    return {
        operationName: "GetXUserAddress",
        query: `query GetXUserAddress($xLinks: [String!]!) { holder(where: { twitter: { _in: $xLinks }, flag: { _eq: none }}) {address alias}}`,
        variables:
        {
            xLinks,
        }
    }
}

function ObjktQuery<T>(query: object): Promise<T | null> {
    return new Promise<T | null>(resolve => {
        fetch(objktEndPoint, {
            method: 'POST',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(query)
        })
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch(() => resolve(null));
    });
}

function GetXUserTezosAddresses(xUser: string | null): Promise<string[]> {
    return new Promise<string[]>(resolve => {
        if (xUser === null) {
            resolve([]);
        } else {
            ObjktQuery<IHolders>(GetXUserAddressQuery([`https://x.com/${xUser}`, `https://twitter.com/${xUser}`]))
                .then(data => data?.data)
                .then(holders => holders?.holder.map(x => x.address))
                .then(x => resolve(x ?? []))
                .catch(() => resolve([]));
        }
    });
}

export const objkt = {
    GetXUserTezosAddresses: RateKeeper(GetXUserTezosAddresses, RATE_LIMIT, { id: RATE_LIMIT_ID })
}