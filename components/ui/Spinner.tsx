import { Container } from "nixix/view-components";

const Spinner = (): someView => {
  return (
    <Container className="w-16 h-16 bg-transparent rounded-full border-8 border-peach border-l-transparent n-animate-spin " />
  )
}

const SpinnerPage = (): someView => {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <Spinner />
    </section>
  )
}

export default Object.assign(Spinner, {
  Page: SpinnerPage
})