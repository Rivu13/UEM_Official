import homeAd from "../../assets/home_add.jpg"

export default function AdBanner() {
  return (
    <section className="w-full">
      <img
        src={homeAd}
        alt="The highest salary offer for a UEM Jaipur student is Rs. 72 Lakhs per annum, from GIGA Data Centre, Atlanta, USA"
        className="h-auto w-full object-cover"
      />
    </section>
  )
}
