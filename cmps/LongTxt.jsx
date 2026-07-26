const { useState } = React

export function LongTxt({ txt = '', length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false)

    const isLong = txt.length > length
    const txtToShow = (isLong && !isExpanded) ? txt.slice(0, length) + '...' : txt

    return <p className="long-txt">
        {txtToShow}
        {isLong && <button className="btn-read-more"
            onClick={() => setIsExpanded(prevIsExpanded => !prevIsExpanded)}>
            {isExpanded ? 'Read less' : 'Read more'}
        </button>}
    </p>
}
