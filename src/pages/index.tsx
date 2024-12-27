import Head from "next/head"
import { Geist, Geist_Mono } from "next/font/google"
import styles from "@/styles/Home.module.css"

import wishlist from "@/data/wishlist.json"
import TopFive from "@/components/TopFive"
import Snow from "@/components/Snow"

import { BarChart, pieArcLabelClasses, PieChart } from "@mui/x-charts"
import Best from "@/components/Best"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const spedizionis = [
  "un giorno",
  "due giorni",
  "tre giorni",
  "~ una settimana",
  "~ due settimane",
  "un mese",
  "> 6 mesi",
  "non disponibile",
]

const spedsLabels = ["1G", "2G", "3G", "~1S", "~2S", "1M", ">6M", "N/D"]

const spedizioniTime = spedizionis.map(timeframe => {
  if (timeframe === "non disponibile") {
    return wishlist.filter(item => item.spedizione === null).length
  }
  return wishlist.filter(item => item.spedizione === timeframe).length
})

const dataset: Record<string, number> = {}
for (let i = 0; i < spedizionis.length; i++) {
  dataset[spedizionis[i]] = spedizioniTime[i]
}

export default function Home() {
  const libri = wishlist.filter(item => item.url.match(/\/dp\/8/) !== null)
  const others = wishlist.filter(item => item.url.match(/\/dp\/8/) === null)

  return (
    <>
      <Head>
        <title>Secret Santa 2024</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Snow />
        <main className={styles.main}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1em",
              margin: "0",
              height: "80vh",
            }}
          >
            <h1
              style={{
                fontSize: "4em",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Ciao Gaya!
            </h1>
            <h2
              style={{
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "bold",
                margin: "0",
              }}
            >
              <span style={{ opacity: 0.8, fontWeight: "normal" }}>
                Benvenuta al tuo
              </span>{" "}
              Secret Santa Wrapped 2024
              <br />
              <span style={{ fontSize: "2em" }}>🎄</span>
            </h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              margin: "0",
            }}
          >
            <p style={{ fontSize: "1.2em" }}>
              Quest&apos;anno hai messo nella wishlist ben <b>51</b> idee
              regalo! 🎁
            </p>
            <p style={{ fontSize: "1.2em" }}>
              Mi hai reso la vita veramente facile.
            </p>
            <p style={{ fontSize: "1.2em" }}>Fin troppo facile.</p>
            <p style={{ fontSize: "1.2em" }}>
              Allora ho deciso di analizzare tutte le tue idee, per trovare
              quale di queste è il regalo perfetto!
            </p>
          </div>

          <h2
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              margin: "1em 0",
              alignSelf: "start",
              marginBottom: "0",
            }}
          >
            Sei un&apos;avida lettrice
          </h2>
          <span
            style={{
              alignSelf: "start",
              textAlign: "left",
              fontSize: "1.2em",
              margin: "0",
            }}
          >
            Il <b>{((libri.length / wishlist.length) * 100).toFixed(1)}%</b> dei
            tuoi desideri sono libri! 📚
          </span>
          <PieChart
            disableAxisListener
            skipAnimation
            series={[
              {
                arcLabel: item =>
                  `${((item.value / wishlist.length) * 100).toFixed(1)}%`,
                data: [
                  { label: "Libri", value: libri.length },
                  { label: "Altro", value: wishlist.length - libri.length },
                ],
                innerRadius: 0,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 4,
                startAngle: -40,
                endAngle: 320,
                cx: 160,
              },
            ]}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "top", horizontal: "middle" },
                padding: 0,
              },
            }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
              },
            }}
            height={300}
          />
          <TopFive
            title="Top 5 libri più votati"
            items={libri
              .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
              .slice(0, 5)}
          />
          <TopFive
            flip
            title="Top 5 libri più popolari"
            items={libri
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 5)}
          />

          <h2
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              margin: "1em 0",
              alignSelf: "start",
              marginBottom: "0",
            }}
          >
            Le spedizioni
          </h2>
          <span
            style={{
              alignSelf: "start",
              textAlign: "left",
              fontSize: "1.2em",
              margin: "0",
            }}
          >
            Non ti piace aspettare, vero? 🕰
            <br />A me no di sicuro, ecco perché pago Amazon Prime 📦
            <br />
            <br />
            Purtroppo
            <b>
              {` ${spedizioniTime[7]} (${(
                (spedizioniTime[7] * 100) /
                wishlist.length
              ).toFixed(1)}%) `}
            </b>
            dei tuoi più profondi desideri non erano disponibili
            <br />
            In compenso
            <b>
              {` ${spedizioniTime[0]} (${(
                (spedizioniTime[0] * 100) /
                wishlist.length
              ).toFixed(1)}%) `}
            </b>
            avevano la spedizione quasi istantanea! 🚀
            <br />
            <span style={{ fontStyle: "italic", opacity: 0.9 }}>
              Milano perks
            </span>
          </span>
          <br />
          <h2
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
              margin: "0",
              alignSelf: "start",
            }}
          >
            Numero di oggetti per tempo di spedizione:
          </h2>
          <BarChart
            dataset={spedizioniTime.map((value, i) => ({
              value,
              label: spedsLabels[i],
            }))}
            yAxis={[
              {
                scaleType: "band",
                dataKey: "label",
              },
            ]}
            layout="horizontal"
            slotProps={{ legend: { hidden: true } }}
            width={350}
            height={300}
            series={[
              {
                dataKey: "value",
              },
            ]}
          />
          <TopFive
            title="Top 5 oggetti più votati"
            items={others
              .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
              .slice(0, 5)}
          />
          <TopFive
            flip
            title="Top 5 oggetti più popolari"
            items={others
              .sort((a, b) => b.reviewCount - a.reviewCount)
              .slice(0, 5)}
          />
          <h2
            style={{
              fontSize: "1.3em",
              fontWeight: "bold",
              margin: "0",
              alignSelf: "start",
            }}
          >
            Distribuzione dei vendor:
          </h2>
          <PieChart
            disableAxisListener
            skipAnimation
            series={[
              {
                arcLabel: item =>
                  `${((item.value / wishlist.length) * 100).toFixed(1)}%`,
                data: [
                  {
                    label: "Venduto e spedito da Amazon",
                    value: wishlist.filter(i => i.fmValue === 2).length,
                  },
                  {
                    label: "Spedito da Amazon, venduto da terzi",
                    value: wishlist.filter(i => i.fmValue === 1).length,
                  },
                  {
                    label: "Venduto e spedito da terzi",
                    value: wishlist.filter(i => i.fmValue === 0).length,
                  },
                ],
                innerRadius: 0,
                outerRadius: 100,
                paddingAngle: 2,
                cornerRadius: 4,
                startAngle: -70,
                endAngle: 290,
                cx: 160,
              },
            ]}
            slotProps={{
              legend: {
                direction: "row",
                position: { vertical: "top", horizontal: "middle" },
                padding: 0,
              },
            }}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
              },
            }}
            height={400}
          />
          <span
            style={{
              alignSelf: "start",
              textAlign: "left",
              fontSize: "1.2em",
              margin: "0",
            }}
          >
            Dobbiamo fare attenzione a chi compriamo, eh? 🕵️‍♂️
          </span>
          <h2
            style={{
              fontSize: "2em",
              fontWeight: "bold",
              margin: "1em 0",
              alignSelf: "start",
              marginBottom: "0",
            }}
          >
            I vincitori 🏆
          </h2>
          <span
            style={{
              alignSelf: "start",
              textAlign: "left",
              fontSize: "1.2em",
              margin: "0",
            }}
          >
            Visti tutti questi incredibili dati, ho deciso di regalarti due
            oggetti da categorie separate con spedizione in un giorno che mi
            hanno permesso di non distaccarmi dal budget di 20€.
            <br />
          </span>
          <h2
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              margin: "1em 0",
              alignSelf: "start",
              marginBottom: "0",
            }}
          >
            🥇 Il miglior libro
          </h2>
          <Best wishItem={libri[4]} />
          <h2
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              margin: "1em 0",
              alignSelf: "start",
              marginBottom: "0",
            }}
          >
            🥇 Il miglior oggetto
          </h2>
          <Best wishItem={others[1]} />

          <span
            style={{
              textAlign: "center",
              fontSize: "1.2em",
              margin: "0",
            }}
          >
            <br />
            Spero che questi dati ti siano piaciuti!
            <br />
            {"tvb <3 UwU"}
          </span>
          <span
            style={{
              textAlign: "center",
              fontSize: "1.6em",
              fontWeight: "bold",
              margin: "0",
            }}
          >
            Buon Natale! 🎅🎄
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.8em",
              opacity: 0.8,
              backgroundColor: "#fff4",
              padding: "1em",
              borderRadius: "8px",
              marginTop: "1em",
              width: "calc(100vw - 48px)",
            }}
          >
            Un progetto di Tommaso Morganti
            <br />
            <a href="https://github.com/toto04/ss24">Source</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Privacy</a>
          </div>
        </main>
      </div>
    </>
  )
}
