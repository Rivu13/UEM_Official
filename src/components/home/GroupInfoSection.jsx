import { useState } from "react"
import { infoTabs } from "../../data/infoTabs"
import InfoTabList from "./InfoTabList"
import InfoContentPanel from "./InfoContentPanel"

export default function GroupInfoSection() {
  const [activeId, setActiveId] = useState(infoTabs[0].id)
  const activeTab = infoTabs.find((tab) => tab.id === activeId)

  return (
    <section className="bg-white py-14">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-xl font-extrabold text-brand-navy sm:text-2xl">
            IEM UEM Group <span className="font-semibold text-slate-400">| Welcome</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            The IEM UEM group is an acclaimed educational group amongst the industry-centred academic training
            organisations of today. IEM has set sublime standards in addressing the technical and managerial
            resource shortage in the new era of dynamic globalisation. The IEM UEM group has risen to fame for its
            strong foundation in teaching and R&D in multifaceted areas. It aims to serve the future generation as
            well as the Nation through its commitment towards self-sufficiency and unmatchable excellence.
          </p>

          <div className="mt-6">
            <InfoTabList tabs={infoTabs} activeId={activeId} onSelect={setActiveId} />
          </div>
        </div>

        <InfoContentPanel tab={activeTab} />
      </div>
    </section>
  )
}
