export function AppHeader({ page = 'Home', onSetPage }) {

    return <header className="app-header full main-layout">
        <section className="header-container">
            <h1>Miss Books</h1>
            <nav>
                <a href="#" className={(page === 'Home') ? 'active' : ''}
                    onClick={(ev) => onSetPage('Home')}>
                    Home
                </a>
                <span> | </span>
                <a href="#" className={(page === 'Books') ? 'active' : ''}
                    onClick={(ev) => onSetPage('Books')}>
                    Books
                </a>
                <span> | </span>
                <a href="#" className={(page === 'About') ? 'active' : ''}
                    onClick={(ev) => onSetPage('About')}>
                    About
                </a>
            </nav>
        </section>
    </header>
}
