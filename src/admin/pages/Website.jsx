import { useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import HeroEditor
from "../components/website/HeroEditor";

import RecentWorksEditor
from "../components/website/RecentWorksEditor";

export default function Website() {

    const [open,setOpen]=useState("hero");

    return(

        <AdminLayout>

            <div className="mb-10">

                <h1 className="text-3xl font-bold">

                    Website

                </h1>

                <p className="text-gray-400 mt-2">

                    Customize every section of your homepage.

                </p>

            </div>

            <div className="space-y-6">

                <HeroEditor

                    open={open==="hero"}

                    onToggle={()=>setOpen(

                        open==="hero"

                        ? null

                        : "hero"

                    )}

                />

                <RecentWorksEditor

                    open={open==="works"}

                    onToggle={()=>setOpen(

                        open==="works"

                        ? null

                        : "works"

                    )}

                />

            </div>

        </AdminLayout>

    );

}