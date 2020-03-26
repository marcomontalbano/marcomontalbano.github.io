import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { Tile } from "@marcomontalbano/component-library"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <Tile
      id="hero"
      title="Hero"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit ante eget augue interdum, in dictum mi sollicitudin. Sed vitae lorem sed augue aliquam auctor ac a justo. Fusce efficitur bibendum lorem, vitae porttitor urna consequat quis. Praesent congue tempor sem, sed mollis massa porta et. Quisque tincidunt bibendum nisi, in porta felis vestibulum eget. Phasellus tempor lobortis purus, facilisis imperdiet nunc volutpat ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis ut velit at magna consequat placerat. Fusce vel tellus nec justo lacinia efficitur. Nam imperdiet sapien pellentesque felis accumsan, id hendrerit justo mattis."
      src="https://picsum.photos/id/958/1280/720"
      link="https://example.com"
    ></Tile>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
