function Footer({ partner }) {
    const switchAudience = partner ? '/user/login' : '/food-partner/login'

    return (
        <footer className="flex flex-col gap-3 border-t border-[#e5e9e4] py-5 text-xs text-[#89958c] dark:border-[#29332c] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 reelish</span>
            <div className="flex gap-5">
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
                <a href={switchAudience}>{partner ? 'I’m a foodie' : 'I’m a food partner'} ↗</a>
            </div>
        </footer>
    )
}

export default Footer
