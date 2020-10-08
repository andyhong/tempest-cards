import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Box, Heading, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/core'
import Table from '../components/Table'
import fetch from 'isomorphic-unfetch'
import CategoryFilter from '../components/CategoryFilter'

const Home = ({ cards }) => {

  const [selectedCategories, setSelectedCategories] = useState([])

  const other = ["other_sports", "non_sport"]
  const categories = {
    baseball: "⚾",
    basketball: "🏀",
    football: "🏈",
    hockey: "🏒",
    other: "🃏",
    gaming: "🎮",
  }

  const formattedCards = cards
    .map(card => {
      return other.includes(card.category) ? { ...card, category: "other" } : { ...card }
    })
    .map(card => {
      return { ...card, name: `${categories[card.category]} ${card.name}`, date: new Date(card.release_date) }
    })
    .filter(card => card.date >= Date.now())
    .sort((a, b) => a.date - b.date)

  const columns = Object.keys(categories).sort()

  function search(rows) {
    return selectedCategories.length === 0
      ? rows
      : rows.filter(row => selectedCategories.includes(row.category))
  }

  function updateFilter(e) {
    setSelectedCategories(e)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tempest Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box
        maxWidth="960px"
        py="3rem"
        display="flex"
        flexDirection="column"
        >
        <Heading
          as="h1"
          fontSize="4rem"
          textAlign="center"
          fontWeight="900"
          lineHeight="1.15"
          letterSpacing="-0.1rem"
        >
          Card Release Calendar
        </Heading>
        <Box
          display="flex">
          <CategoryFilter categories={categories} columns={columns} onChange={updateFilter}/>
          <Stat
            px={6}
            py={4}
            backgroundColor="white"
            borderRadius="1.5rem"
            backgroundColor="white"
            boxShadow="lg"
            overflow="hidden"
            mx={2}
            my={6}
            textAlign="center"
            >
            <StatLabel
              mt={1}
              color="gray.500"
              fontWeight="500"
            >
              CURRENTLY TRACKING
            </StatLabel>
            <StatNumber>{formattedCards.length}</StatNumber>
            <StatHelpText>CARD SETS</StatHelpText>
          </Stat>
        </Box>
        <Table data={search(formattedCards)} categories={selectedCategories} />
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const data = await fetch(`${process.env.API_URL}/api/cards`)
  const cards = await data.json()
  return {
    props: {
      cards,
    }
  }
}

export default Home
