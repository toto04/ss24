import {} from "@chakra-ui/react"
import { Wish } from "@/types"
import WishItem from "./WishItem"

interface TopFiveProps {
  title: string
  items: Wish[]
  flip?: boolean
}

/**
 * A component that takes a title and an array of wish items, and displays the title and the wish items
 */
export default function TopFive({ title, items, flip }: TopFiveProps) {
  return (
    <div style={{ padding: 0 }}>
      <h2
        style={{
          fontSize: "2em",
          fontWeight: "bold",
          margin: "1em 0",
        }}
      >
        {title}
      </h2>
      {items.map((item, index) => (
        <WishItem flip={flip} key={index} number={index + 1} wishItem={item} />
      ))}
    </div>
  )
}
