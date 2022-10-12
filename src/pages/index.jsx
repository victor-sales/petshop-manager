import { useRouter } from "next/router"
import { useEffect } from "react"
import Header from "../components/Header"
import Layout from "../components/Layout"

export default function Home() {

  const router = useRouter()

  return (
    <>
        <Header />
        <Layout>
            <div className="">

            </div>
        Hello World
        </Layout>
    </>
  )
}
