import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import smartQuotes from 'smartquotes';
import { spaceId, environmentId, accessToken } from '../contentful.js';

const Question = ({question}) => (
  <Layout question={question}>
    <blockquote className="container">
      <p className="question">{smartQuotes(question.text)}</p>
      <footer className="question-footer">
        <p className="citation">&ndash;&nbsp;<a href={question.attribution.url} className="citation-link">{question.attribution.name}</a></p>
      </footer>
    </blockquote>
  </Layout>
)

async function getEntryById(questionId) {
  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries/${questionId}?access_token=${accessToken}`;
  const res = await fetch(url)
  const data = await res.json()

  const { fields: entryFromContentful, sys: {id} } = data;

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

Question.getInitialProps = async function({ query: { id } }) {
  const entry = await getEntryById(id);

  return { question: entry }
}

export default Question
