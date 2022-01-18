import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface PriceProps {
    coinId: string;
}
interface PriceData {
    quotes: {
        USD: {
            percent_change_1h: number;
            percent_change_6h: number;
            percent_change_12h: number;
            percent_change_24h: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
        };
    };
}
interface IColorProp {
    colorData: number;
}
const InfoContainer = styled.div<IColorProp>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    margin-bottom: 5px;
    h4 {
        font-weight: 700;
    }
    span {
        color: ${(props) => (props.colorData === 1 ? "#81ecec" : "#e17055")};
    }
`;
function Price({ coinId }: PriceProps) {
    const { isLoading, data } = useQuery<PriceData>(
        ["tickers", coinId],
        () => fetchCoinTickers(coinId),
        { refetchInterval: 5000 }
    );
    return (
        <div>
            {isLoading ? (
                "Loading Price..."
            ) : (
                <>
                    <InfoContainer
                        colorData={Math.sign(data?.quotes.USD.price)}
                    >
                        <h4>Price</h4>
                        <span>$ {data?.quotes.USD.price.toFixed(2)}</span>
                    </InfoContainer>
                    <InfoContainer
                        colorData={Math.sign(
                            data?.quotes.USD.percent_from_price_ath
                        )}
                    >
                        <h4>Max. Change Rate (24h)</h4>
                        <span>
                            ${" "}
                            {data?.quotes.USD.percent_from_price_ath.toFixed(2)}
                        </span>
                    </InfoContainer>
                    <InfoContainer
                        colorData={Math.sign(
                            data?.quotes.USD.percent_change_30m
                        )}
                    >
                        <h4>Change Rate (30m)</h4>
                        <span>
                            $ {data?.quotes.USD.percent_change_30m.toFixed(2)}
                        </span>
                    </InfoContainer>
                    <InfoContainer
                        colorData={Math.sign(
                            data?.quotes.USD.percent_change_1h
                        )}
                    >
                        <h4>Change Rate (1h)</h4>
                        <span>
                            $ {data?.quotes.USD.percent_change_1h.toFixed(2)}
                        </span>
                    </InfoContainer>
                    <InfoContainer
                        colorData={Math.sign(
                            data?.quotes.USD.percent_change_12h
                        )}
                    >
                        <h4>Change Rate (12h)</h4>
                        <span>
                            $ {data?.quotes.USD.percent_change_12h.toFixed(2)}
                        </span>
                    </InfoContainer>
                    <InfoContainer
                        colorData={Math.sign(
                            data?.quotes.USD.percent_change_24h
                        )}
                    >
                        <h4>Change Rate (24h)</h4>
                        <span>
                            $ {data?.quotes.USD.percent_change_24h.toFixed(2)}
                        </span>
                    </InfoContainer>
                </>
            )}
        </div>
    );
}
export default Price;
