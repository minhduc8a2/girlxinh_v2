import React, { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  SortDescriptor,
} from "@nextui-org/react"
import { GirlType } from "@/types/girls.types"
import { useRouter, useSearchParams } from "next/navigation"
import { renderCell } from "./RenderCell"
import { columns, sortableColumns } from "./columns"
import TableSearch from "@/components/TableSearch"
export default function FullTable({
  girls,
  totalPages,
}: Readonly<{
  girls: GirlType[]
  totalPages: number
}>) {
  const searchParams = useSearchParams()
  //page
  const page = !isNaN(parseInt(searchParams.get("page") ?? "1"))
    ? parseInt(searchParams.get("page") ?? "1")
    : 1
  //sort_level
  const parsedSortLevel = parseInt(searchParams.get("sort_level") as string)
  const sort_level = !isNaN(parsedSortLevel)
    ? parsedSortLevel == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedCreatedAt = parseInt(searchParams.get("sort_created") as string)
  const sort_created = !isNaN(parsedCreatedAt)
    ? parsedCreatedAt == 1
      ? 1
      : -1
    : undefined
  //
  //createdAt
  const parsedUpdatedAt = parseInt(searchParams.get("sort_updated") as string)
  const sort_updated = !isNaN(parsedUpdatedAt)
    ? parsedUpdatedAt == 1
      ? 1
      : -1
    : undefined
  //
  //search
  const search = searchParams.get("search") ?? ""
  //input search
  const [inputSearch, setInputSearch] = useState(search)
  //
  const router = useRouter()

  //sort in table
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "none",
    direction: "ascending",
  })
  useEffect(() => {
    const direction = sortDescriptor.direction == "ascending" ? 1 : -1
    switch (sortDescriptor.column) {
      case "createdAt":
        router.push(
          `/admin/girls?page=${page}&search=${search}&sort_created=${direction}`
        )
        break

      case "level":
        router.push(
          `/admin/girls?page=${page}&search=${search}&sort_level=${direction}`
        )
        break
    }
  }, [
    sortDescriptor,
    page,
    search,
    sort_updated,
    sort_created,
    router,
    sort_level,
  ])
  const onSearch = (clear?: boolean) => {
    router.push(
      `/admin/girls?page=${page}&search=${
        clear ? "" : inputSearch
      }&sort_created=${sort_created}&sort_level=${sort_level}`
    )
  }
  return (
    <div className="">
      <TableSearch
        onSearch={onSearch}
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        router={router}
        createButtonName="Tạo girl xinh"
        createPageLink="/admin/girls/create"
      />
      <Table
        aria-label="Example static collection table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              initialPage={page}
              onChange={(page) =>
                router.push(
                  `/admin/girls?page=${page}&search=${search}&sort_created=${sort_created}&sort_level=${sort_level}&sort_updated=${sort_updated}`
                )
              }
              total={totalPages}
            />
          </div>
        }
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn
              key={column.key}
              allowsSorting={sortableColumns.includes(column.key)}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No girls to display."} items={girls}>
          {(item) => (
            <TableRow key={item._id?.toString()}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
