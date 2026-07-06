import { Brush } from "lucide-react";

import CollapsibleSection
from "./CollapsibleSection";

export default function RecentWorksEditor({

    open,

    onToggle,

}) {

    return (

        <CollapsibleSection

            title="Recent Works"

            subtitle="Homepage Section"

            icon={Brush}

            open={open}

            onToggle={onToggle}

        >

            <div
                className="
                    grid
                    lg:grid-cols-2
                    gap-8
                "
            >

                <div
                    className="
                        bg-gray-900
                        rounded-2xl
                        p-6
                    "
                >

                    FORM

                </div>

                <div
                    className="
                        bg-gray-900
                        rounded-2xl
                        p-6
                        flex
                        justify-center
                        items-center
                    "
                >

                    PREVIEW

                </div>

            </div>

        </CollapsibleSection>

    );

}