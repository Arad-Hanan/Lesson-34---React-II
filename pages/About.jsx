const { useRef } = React
import { utilService } from "../services/util.service.js"

export function About() {
    const titleRef = useRef()

    return <section className="about">
        <h2 ref={titleRef}>About Miss Books</h2>
        <p>Miss Books is a small app for managing a personal book collection - browse the
            list, filter by title, price or category, dive into the full details of a book
            and add new ones of your own.</p>

        <button onClick={() => {
            utilService.animateCSS(titleRef.current)
        }}>Animate</button>
    </section>
}
