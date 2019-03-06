import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { spaceId, environmentId, accessToken } from '../contentful.js';


const Index = ({question}) => (
  <Layout>
    <h2 className="question">{question.text}</h2>
  </Layout>
)

async function entryCount() {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?content_type=question&access_token=${accessToken}&limit=0`;
  const res = await fetch(url)
  const data = await res.json()

  return data.total;
}

async function getSpecificEntry(index) {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?content_type=question&access_token=${accessToken}&skip=${index}&limit=1`;
  const res = await fetch(url)
  const data = await res.json()

  return { text: JSON.stringify(data.items[0].fields.text) };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function randomEntryIndex() {
  const max = await entryCount();

  const index = getRandomInt(max-1);

  const entry = await getSpecificEntry(index);

  return entry;
}

async function entryToShow() {
  const entry = await randomEntryIndex();

  return entry;
}

Index.getInitialProps = async function() {
  const entry = await entryToShow();

  return { question: entry }
}

export default Index
