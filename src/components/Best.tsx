import Image from "next/image"
import { Wish } from "@/types"
import { Box, Text } from "@chakra-ui/react"

interface WishItemProps {
  wishItem: Wish
}

/**
 * A component that takes a wish item and a number, and displays the number, the wish item image, and the wish item name
 */
export default function WishItem({ wishItem }: WishItemProps) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
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
          width: 200,
          height: 300,
        }}
      >
        <Text
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            color: "black",
            fontSize: "2em",
            fontWeight: "bold",
            zIndex: 1000,
            height: 60,
            width: 60,
            textAlign: "center",
            lineHeight: "60px",
            borderRadius: "50%",
            backgroundColor: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          👑
        </Text>
        <Image
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: 16,
            width: 200,
            height: 300,
            objectFit: "cover",
          }}
          src={wishItem.imageURL}
          alt={wishItem.name}
          width={200}
          height={300}
        />
      </Box>
      <Box
        style={{
          flex: "1 1 auto",
          fontSize: "1.4em",
        }}
      >
        <Text style={{ fontWeight: "bold" }} lineClamp={2}>
          {wishItem.name}
        </Text>
        <Text
          style={{
            opacity: 0.8,
            fontSize: "1em",
            maxWidth: 300,
          }}
          truncate
        >
          {wishItem.category}
        </Text>
        <Text
          style={{
            fontSize: "1em",
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
