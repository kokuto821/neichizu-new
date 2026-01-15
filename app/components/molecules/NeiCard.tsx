import { WGeoparkFromSelected } from "@/app/feature/map/geopark/types/types";
import { HyakumeizanFromSelected } from "@/app/feature/map/hyakumeizan/types/types";
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NeiCompactCard } from "./NeiCompactCard";
import { NeiExpandedCard } from "./NeiExpandedCard";

type Props = {
    selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
}

export const NeiCard = ({ selectedFeature }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <NeiCompactCard 
            key="compact"
            selectedFeature={selectedFeature}
            onExpand={() => setIsExpanded(true)}
          />
        ) : (
          <NeiExpandedCard 
            key="expanded"
            selectedFeature={selectedFeature}
            onClose={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    );
}