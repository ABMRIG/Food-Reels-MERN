function Header({ partner }) {
    return (
        <header className="flex items-center justify-between py-2">
            <a className="brand-mark" href="/user/login" aria-label="Reelish home">
                <span className="brand-dot" />
                reelish<span className="brand-accent">.</span>
            </a>
            <p className="hidden text-sm text-[#6d786f] dark:text-[#aab7ad] sm:block">
                {partner ? 'Grow your food story' : 'Find your next favorite'}
            </p>
        </header>
    )
}

export default Header
