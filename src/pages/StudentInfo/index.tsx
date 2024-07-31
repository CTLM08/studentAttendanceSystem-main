import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import StudentListHeader from "../ManageAbsences/components/StudentList/components/StudentListHeader";
import { StudentData } from "../ManageAbsences/types";
import StudentList from "./components/StudentList";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import AppContext from "../../AppContext";
import moment from "moment";

const StudentInfo = () => {
  const [search, setSearch] = useState("");
  const { userData } = useContext(AppContext);
  const [allData, setAllData] = useState<StudentData[] | null>(null);
  const [filteredData, setFilteredData] = useState<StudentData[]>();
  const [statuses, setStatuses] = useState<
    Record<string, { type: string; reason: string }>
  >(Object.create(null));

  useEffect(() => {
    if (userData?.class) {
      const q = query(
        collection(firestore, "students"),
        where("class", "==", userData.class)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data() as StudentData);
        setAllData(data);
      });

      return unsubscribe;
    } else {
      const unsubscribe = onSnapshot(
        collection(firestore, "students"),
        (querySnapshot) => {
          const data = querySnapshot.docs.map(
            (doc) => doc.data() as StudentData
          );
          setAllData(data);
        }
      );

      return unsubscribe;
    }
  }, [userData?.class]);

  useEffect(() => {
    if (allData) {
      setFilteredData(
        allData.filter(
          (e) =>
            e.name_ch.toLowerCase().includes(search.toLowerCase()) ||
            e.name_en.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, allData]);

  useEffect(() => {
    if (allData) {
      const IDs = allData.map((e) => e.id);

      const q = query(
        collection(firestore, "attendance"),
        where("date", "==", moment().format("DD/MM/YYYY"))
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((e: any) => IDs.includes(e.id));

        const statuses = Object.fromEntries(
          data.map((e: any) => [
            e.id,
            {
              type: e.type,
              reason: e.reason,
            },
          ])
        );

        setStatuses(statuses);
      });

      return unsubscribe;
    }
  }, [allData]);

  return (
    <>
      <div className="flex gap-5 px-5 py-4 mb-4 whitespace-nowrap rounded-lg bg-zinc-800/50">
        <label htmlFor="searchInput" className="sr-only">
          搜索学生
        </label>
        <input
          id="searchInput"
          type="text"
          placeholder="搜索学生..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-auto my-auto bg-transparent outline-none placeholder-zinc-400 caret-znc-100"
        />
        <Icon icon="tabler:search" className="size-6 text-zinc-400" />
      </div>
      <StudentListHeader />
      <>
        {filteredData ? (
          <StudentList students={filteredData} statuses={statuses} />
        ) : (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl text-slate-300">没有学生信息</p>
          </div>
        )}
      </>
    </>
  );
};

export default StudentInfo;
