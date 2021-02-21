export default function Card(props) {
    return (
        <div className="card">
            <div className="card-title">{props.device}</div>
            <img src={`/api/${props.source}`} className="card-screenshot" />
            <style jsx>
                {`
                    .card {
                        display: flex;
                        flex-direction: column;
                        background: black;
                        color: white;
                        border-radius: 5px;
                        padding: 15px;
                        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                            0 12.5px 10px rgba(0, 0, 0, 0.06),
                            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                            0 100px 80px rgba(0, 0, 0, 0.12);
                    }
                    .card-title {
                        flex: 1;
                        text-align: center;
                        font-family: Helvetica;
                        font-size: 22px;
                    }
                    .card-screenshot {
                        flex: 8;
                        max-width: 100%;
                        height: 50%;
                        width: 80%;
                        align-self: center;
                        object-fit: contain;
                    }
                `}
            </style>
        </div>
    )
}
