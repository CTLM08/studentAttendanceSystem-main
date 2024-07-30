import { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import StudentListHeader from "../ManageAbsences/components/StudentList/StudentListHeader";
import { StudentData } from "../ManageAbsences/types";
import StudentList from "./component";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import AppContext from "../../AppContext";

const StudentInfo = () => {
  const [search, setSearch] = useState("");
  const [value, loading] = useCollection(collection(firestore, "students"));
  const [filteredData, setFilteredData] = useState<StudentData[]>();
  const { userData } = useContext(AppContext);

  useEffect(() => {
    if (!loading) {
      setFilteredData(
        value!.docs
          .map((doc) => doc.data() as StudentData)
          .filter(
            (student) =>
              (student.class == userData?.class &&
                student.name_ch.toLowerCase().includes(search.toLowerCase())) ||
              student.name_en.toLowerCase().includes(search.toLowerCase()) ||
              student.class.toLowerCase().includes(search.toLowerCase())
          )
      );
    }
  }, [search, loading]);

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
        {loading || !value ? (
          <div>Loading...</div>
        ) : filteredData ? (
          <StudentList
            students={filteredData.filter((e) => e.class == userData?.class)}
          />
        ) : (
          <StudentList students={value?.docs.map((doc) => doc.data) as any} />
        )}
      </>
    </>
  );
};

export default StudentInfo;
