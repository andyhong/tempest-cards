import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Form, Table } from 'react-bootstrap'
import fetch from 'isomorphic-unfetch'

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
  console.log(columns)

  function search(rows) {
    return selectedCategories.length === 0
      ? rows
      : rows.filter(row => selectedCategories.includes(row.category))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tempest Cards</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Tempest Cards Calendar
        </h1>
        <Form>
          <div>
            {columns && columns.map(column => (
              <Form.Check
                inline
                label={column}
                type="checkbox"
                id={column}
                checked={selectedCategories.includes(column)}
                onChange={(e) => {
                  const checked = selectedCategories.includes(column)
                  setSelectedCategories(prev => checked
                    ? prev.filter(sc => sc !== column)
                    : [...prev, column])
                }}
                />
            ))}
          </div>
        </Form>
        <Table>
          <thead>
            <tr>
              <th>Set Name</th>
              <th>Release Date</th>
            </tr>
          </thead>
          <tbody>
            {search(formattedCards).map(card => (
              <tr key={card._id}>
                <td>{ card.name }</td>
                <td>{ card.release_date }</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>

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
  const data = await fetch(`http://localhost:3000/api/cards`)
  const cards = await data.json()
  return {
    props: {
      cards,
    }
  }
}

export default Home
