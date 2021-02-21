import Cards from '../../components/cards'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [cards, setCards] = useState([])
    const [url, setUrl] = useState('')
    const poll = useRef(null)
    useEffect(() => {
        const { reportId } = router.query
        poll.current = setInterval(() => {
            loadData(reportId)
        }, 3000)
        return () => {
            if (poll.current) clearInterval(poll.current)
        }
    }, [router])

    const loadData = async (reportId) => {
        setIsLoading(true)
        const result = await fetch('/api/status')
        const { status } = await result.json()
        let currentStatus = true
        for (let key in status) {
            currentStatus = status[key] === 'done' && currentStatus
        }
        if (currentStatus) {
            const res = await fetch(`/api/report?id=${reportId}`)
            const { reports } = await res.json()
            setUrl(reports[0].url)
            setCards([...reports])
            setIsLoading(false)
            clearInterval(poll.current)
        } else {
            await loadData(reportId)
        }
    }
    return (
        <div className="container">
            {/* check if loading by querying status, if status is done, get data all pictures then display cards*/}
            {isLoading ? (
                <img src="http://www.autopricemanager.com/img/widget-loader-lg-en.gif" />
            ) : (
                <div className="inner-container">
                    <header className="header">
                        <h1>
                            Web Report for {url && <a href={url}>{`${url}`}</a>}
                        </h1>
                    </header>
                    <Cards cards={cards} />
                </div>
            )}
            <style jsx>
                {`
                    .container {
                        height: 100vh;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: flex-end;
                        background: url('/wallpaper.jpg');
                        background-size: contain;
                    }
                    .inner-container {
                        height: 100%;
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                    }
                    .header {
                        flex: 1;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    a {
                        color: rgba(225, 10, 165, 1);
                    }
                    a:hover {
                        color: rgba(205, 10, 125, 1);
                    }
                `}
            </style>
        </div>
    )
}
