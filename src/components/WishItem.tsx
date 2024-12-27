import Image from "next/image"
import { Wish } from "@/types"
import { Box, Text } from "@chakra-ui/react"

interface WishItemProps {
  number: number
  wishItem: Wish
  flip?: boolean
}

/**
 * A component that takes a wish item and a number, and displays the number, the wish item image, and the wish item name
 */
export default function WishItem({ number, wishItem, flip }: WishItemProps) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: flip ? "row-reverse" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "1em",
        margin: "12px 0",
      }}
    >
      <Box
        style={{
          flex: "0 0 auto",
          position: "relative",
          width: 100,
          height: 100,
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: 4,
            left: flip ? undefined : 4,
            right: flip ? 4 : undefined,
            color: "black",
            fontSize: "2em",
            fontWeight: "bold",
            zIndex: 1000,
            height: 40,
            width: 40,
            textAlign: "center",
            lineHeight: "40px",
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          {number}
        </Text>
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 16,
            width: 100,
            height: 100,
            objectFit: "cover",
          }}
          src={wishItem.imageURL}
          alt={wishItem.name}
          width={100}
          height={100}
        />
      </Box>
      <Box
        style={{
          flex: "1 1 auto",
          fontSize: "1.1em",
        }}
      >
        <Text style={{ fontWeight: "bold" }} lineClamp={2}>
          {wishItem.name}
        </Text>
        <Text
          style={{
            opacity: 0.8,
            fontSize: "1em",
            maxWidth: 200,
          }}
          truncate
        >
          {wishItem.category}
        </Text>
        <Text
          style={{
            fontSize: "0.8em",
            maxWidth: 200,
          }}
          truncate
        >
          ⭐️ {wishItem.rating ?? "N/A"} / 5 {`(${wishItem.reviewCount})`}
        </Text>
      </Box>
    </Box>
  )
}
