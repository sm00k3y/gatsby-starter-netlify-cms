import * as React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import firebase from '../firebase'


export const AboutPageTemplate = ({ title, content, contentComponent, id }) => {
  const PageContent = contentComponent || Content

  const addBook = () => {
    console.log("I'm here!")
    let value = "hello";
    firebase.database().ref("comments/").push().set({
      title: value,
    }, (error) => {
      if (error) {
        console.log(error.message)
      } else {}
    })
  }

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <PageContent className="content" content={content} />
              <form onSubmit={addBook}>
                <input type="submit" value="Sumbit"/>
                <button onClick={() => firebase.database().ref("comments").push({title: "Hello"})}>
                  Click me!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        id={post.id}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
      id
    }
  }
`
