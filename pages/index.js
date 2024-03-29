import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import smartQuotes from 'smartquotes';
import { spaceId, environmentId, accessToken } from '../contentful.js';


const Index = ({question}) => (
  <Layout>
    <blockquote className="container">
      <p className="question">{smartQuotes(question.text)}</p>
      <footer className="question-footer">
        <p className="citation">&ndash;&nbsp;<a href={question.attribution.url} className="citation-link">{question.attribution.name}</a></p>
        <a className="question-permalink" href={questionUrl(question)}>
            permalink
        </a>
      </footer>
    </blockquote>
  </Layout>
)

async function entryCount() {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?content_type=question&access_token=${accessToken}&limit=0`;
  const res = await fetch(url)
  const data = await res.json()

  return data.total;
}

async function getSpecificEntryByIndex(index) {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?content_type=question&access_token=${accessToken}&skip=${index}&limit=1`;
  const res = await fetch(url)
  const data = await res.json()

  const { fields: entryFromContentful, sys: {id} } = data.items[0];

  return { 
    id,
    text: entryFromContentful.text,
    attribution: {
      name: entryFromContentful.attributionName,
      url: entryFromContentful.attributionUrl
    }
  };
}

function questionUrl(question) {
  return `/q/${question.id}`;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function randomEntryIndex() {
  const max = await entryCount();

  const index = getRandomInt(max-1);

  const entry = await getSpecificEntryByIndex(index);

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
