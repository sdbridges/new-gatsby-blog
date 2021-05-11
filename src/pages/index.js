import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color:blue;
`

export default ({ data }) => {
  console.log(data)
  return (
  <Layout>
    <Seo title="Home" />
    <div>
      <h1> Stuart's Thoughts</h1>
      <h4>Total Blog Posts - { data.allMarkdownRemark.totalCount }</h4>
      {
        data.allMarkdownRemark.edges.map(({node}) => (
          <div key={node.id}> 
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              { node.frontmatter.title } - {node.frontmatter.date}
            </BlogTitle>
          </BlogLink>
            <p>{node.excerpt}</p>
          </div>
        ))
      }
    </div> 

    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`
