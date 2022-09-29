import React from "react";
import { BookmarkIcon, UsersIcon } from "@heroicons/react/solid";
import { CalendarIcon } from "@heroicons/react/outline";
import Pagination from "../Navigation/Pagination/Pagination";
import Tabs from "../Navigation/Tabs/Tabs";

import styles from "./TicketList.Module.scss";

const positions = [
  {
    id: 1,
    title: "Добавить сотрудника",
    type: "Выполняется",
    location: "ДБО ФЛ",
    department: "ДБО ФЛ Support",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 2,
    title: "Мастеркард",
    type: "В ожидании",
    location: "Архитектурная группа",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 3,
    title: "Активация карт",
    type: "Закрыт",
    location: "Elma",
    department: "Elma Support",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
  {
    id: 4,
    title: "Добавить сотрудника",
    type: "Выполняется",
    location: "ДБО ФЛ",
    department: "ДБО ФЛ Support",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 5,
    title: "Мастеркард",
    type: "В ожидании",
    location: "Архитектурная группа",
    department: "Engineering",
    closeDate: "2020-01-07",
    closeDateFull: "January 7, 2020",
  },
  {
    id: 6,
    title: "Активация карт",
    type: "Закрыт",
    location: "Elma",
    department: "Elma Support",
    closeDate: "2020-01-14",
    closeDateFull: "January 14, 2020",
  },
];
const status = (el) => {
  if (el === "Закрыт") {
    return " bg-gray-100 text-gray-800";
  } else if (el === "В ожидании") {
    return " bg-orange-100 text-orange-800";
  } else if (el === "new") {
    return " bg-indigo-100 text-idigo-800";
  } else {
    return " bg-green-100 text-green-800";
  }
};

function TicketList(props) {
  const ticketData = props.userRequest;
  const isTicketLoading = ticketData.status === "loading";
  return (
    <>
      <div className={"px-4 sm:px-6 md:px-0 mb-2"}>
        <h1 className="text-2xl font-semibold text-gray-900">Мои Заявки</h1>
      </div>
      <Tabs className={styles.tabs} />
      <div className="bg-white shadow overflow-hidden sm:rounded-md mt-4 mb-6">
        <ul role="list" className="divide-y divide-gray-200">
          {(isTicketLoading ? positions : ticketData.items.items).map(
            (data) => (
              <li key={data.id}>
                <a
                  href={"/ticket/user-request/" + data.id}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {data.ref}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={
                            "px-2 inline-flex text-xs leading-5 font-semibold rounded-full" +
                            status(data.status)
                          }
                        >
                          {data.status}
                        </p>
                        {}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <UsersIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {data.team_name}
                          {/*<div className="flex overflow-hidden -space-x-1 ml-1">*/}
                          {/*    {position.applicants.map((applicant) => (*/}
                          {/*        <img*/}
                          {/*            key={applicant.email}*/}
                          {/*            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"*/}
                          {/*            src={applicant.imageUrl}*/}
                          {/*            alt={applicant.name}*/}
                          {/*        />*/}
                          {/*    ))}*/}
                          {/*</div>*/}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <BookmarkIcon
                            className="flex-shrink-0 mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {data.servicesubcategory_name}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <CalendarIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          <time dateTime={data.last_update}>
                            {data.last_update}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            )
          )}
        </ul>
      </div>
      <Pagination />
    </>
  );
}

export default TicketList;
