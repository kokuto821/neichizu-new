import { WGeoparkFromSelected } from "@/app/feature/map/geopark/types/types";
import { HyakumeizanFromSelected } from "@/app/feature/map/hyakumeizan/types/types";
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { NeiCompactCard } from "./NeiCompactCard";
import { NeiExpandedCard } from "./NeiExpandedCard";

type Props = {
  selectedFeature: HyakumeizanFromSelected | WGeoparkFromSelected | null;
}

export const NeiCard = ({ selectedFeature }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasBeenExpanded, setHasBeenExpanded] = useState(false);

  // フィーチャが変わったら状態をリセット
  useEffect(() => {
    setIsExpanded(false);
    setHasBeenExpanded(false);
  }, [selectedFeature]);

  return (
    <>
      <AnimatePresence>
        {!isExpanded && (
          <NeiCompactCard
            key="compact"
            selectedFeature={selectedFeature}
            onExpand={() => {
              setIsExpanded(true);
              setHasBeenExpanded(true);
            }}
            fadeInDelay={hasBeenExpanded ? 0 : undefined}
          />
        )}
      </AnimatePresence>
      {selectedFeature && (
        <NeiExpandedCard
          key="expanded"
          selectedFeature={selectedFeature}
          isExpanded={isExpanded}
          onClose={() => {
            setIsExpanded(false);
          }}
        />
      )}
    </>
  );
}