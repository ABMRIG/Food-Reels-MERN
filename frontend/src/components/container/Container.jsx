import { Outlet } from 'react-router-dom'

function Container({ partner }) {
    return (
        <section className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(420px,480px)] lg:gap-24 lg:py-16">
            <div className="auth-intro max-w-xl">
                <div className="eyebrow mb-7">
                    <span className="eyebrow-line" />
                    {partner ? 'For food partners' : 'Your food, your way'}
                </div>
                <h1 className="max-w-2xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl">
                    {partner ? <>Put your menu <em>in the spotlight.</em></> : <>Good food is <em>worth sharing.</em></>}
                </h1>
                <p className="mt-7 max-w-md text-base leading-7 text-[#6d786f] dark:text-[#aab7ad] sm:text-lg">
                    {partner
                        ? 'Turn daily specials and signature dishes into moments people can discover, save, and order.'
                        : 'Discover the dishes people are talking about, one delicious reel at a time.'}
                </p>
                <div className="mt-12 flex items-center gap-4 text-sm text-[#6d786f] dark:text-[#aab7ad]">
                    <span className="avatar-stack" aria-hidden="true"><i /><i /><i /></span>
                    <span>{partner ? 'Join local food creators' : 'Loved by curious foodies'}</span>
                </div>
            </div>
            <Outlet />
        </section>
    )
}

export default Container
