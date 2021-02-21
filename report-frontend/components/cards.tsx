import Card from './card'
export default function Home(props) {
    const cards = [{}, {}, {}]
    return (
        <div className="cards">
            {props.cards.map((card) => (
                <Card
                    key={card.device + card.id}
                    source={card.source}
                    url={card.url}
                    device={card.device}
                />
            ))}
            <style jsx>
                {`
                    .cards {
                        flex: 2;
                        height: 70%;
                        background: rgba(225, 10, 165, 1);
                        overflow-x: scroll;
                        padding: 5%;
                        display: grid;
                        grid-gap: 30px;
                        grid-auto-flow: column;
                        grid-auto-columns: calc(50% - var(--gutter) * 2);
                        grid-template-columns: 10px repeat(6, calc(50% - 200px)) 10px;
                        grid-template-rows: minmax(150px, 1fr);
                        scrollbar-width: thin;
                    }
                    .cards::before,
                    .cards::after {
                        content: '';
                        width: 10px;
                    }
                `}
            </style>
        </div>
    )
}
