import React, { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const isURL = (url) => {
        if (!url) return false
        var pattern = new RegExp(
            '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
                'localhost' + // OR localhost
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
            'i'
        ) // fragment locator
        return pattern.test(url)
    }
    const loadData = async (e) => {
        e.preventDefault()
        if (!isURL(url)) return setError('Invalid URL')
        setError(null)
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    devices: [
                        'iPhone 11 Pro',
                        'iPad Mini',
                        'Microsoft Lumia 950',
                        'Nokia N9 landscape',
                    ],
                    url,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 404) return setError('Page not found')
            if (res.status !== 200) return setError('Server Error')
            const { id } = await res.json()
            // api request to get
            router.push({
                pathname: '/reports/report',
                query: { reportId: id },
            })
        } catch (error) {
            console.log(error)
            console.error(error)
        }
    }
    return (
        <div className="container">
            <header className="header">
                <h1 className="header-text">Web Report</h1>
            </header>
            <div className="form">
                <input
                    type="text"
                    placeholder="Please enter an URL"
                    onChange={(e) => setUrl(e.target.value)}
                    onSubmit={(e) => loadData(e)}
                />
                <button
                    onClick={(e) => {
                        loadData(e)
                    }}
                >
                    Generate Report
                </button>
                {error && <div className="error">{error}</div>}
            </div>
            <footer className="footer">
                <div className="links">
                    <div>Github</div>
                </div>
            </footer>
            <style jsx>
                {`
                    @media only screen and (max-width: 600px) {
                        .container {
                            background-position: 50% 170%;
                        }
                    }
                    .container {
                        height: 100vh;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: url('/wallpaper.jpg');
                        background-size: 180%;
                        background-position: 50% 50%;
                    }
                    .header {
                        flex: 2;
                        font-size: 2rem;
                    }

                    .header-text {
                        color: rgba(225, 10, 165, 1);
                        font-family: 'Helvetica';
                    }
                    .form {
                        flex: 2;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                    .form input {
                        width: 50%;
                        border-radius: 10px;
                        font-size: 25px;
                        border-color: rgba(0, 0, 0, 0.3);
                    }
                    .form button {
                        margin: 5%;
                        width: 150px;
                        background: rgba(225, 10, 165, 1);
                        color: rgba(250, 240, 200, 1);
                        border-color: rgba(0, 0, 0, 0.1);
                        height: 40px;
                        border-radius: 20px;
                        transition: all 0.2s ease-in-out;
                        cursor: pointer;
                        box-shadow: 5px 6px 10px 1px rgba(0, 0, 0, 0.3);
                    }
                    .form button:hover {
                        transform: scale(1.02);
                    }
                    .error {
                        color: red;
                    }
                    .footer {
                        flex: 2;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                    }
                    .links: {
                        height: 20%;
                    }
                `}
            </style>
        </div>
    )
}
