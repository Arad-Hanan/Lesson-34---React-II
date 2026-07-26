export function BookPreview({ book }) {
    const { title, thumbnail, listPrice } = book

    return <article className="book-preview">
        <h3>{title}</h3>
        <img src={thumbnail} alt={title} />
        <p className="price">{listPrice.amount} {listPrice.currencyCode}</p>
        {listPrice.isOnSale && <span className="sale-badge">On Sale!</span>}
    </article>
}
