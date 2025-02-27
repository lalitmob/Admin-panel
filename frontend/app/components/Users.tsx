import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useUser from "../api/user.api";
import { TextField } from "@mui/material";
interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phoneNumber", label: "Phone", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170, align: "left" },
  { id: "Designation", label: "Designation", minWidth: 170, align: "left" },
  { id: "JoinDate", label: "Joining Date", minWidth: 170, align: "left" },
  { id: "role", label: "Role", minWidth: 170, align: "left" },
];

interface Data {
  name: string;
  phoneNumber: object;
  email: string;
  Designation: string;
  JoinDate: string;
  role: string;
}

export default function ColumnGroupingTable({search, sort}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState<Data[]>([]);

  const { allUsersDetails } = useUser();

  React.useEffect(() => {
    allUsersDetails((users: any) => {
      const formattedUsers = users.map((user: any) => ({
        name: `${user.userName.firstName} ${user.userName.lastName}`,
        phoneNumber:
          typeof user.phoneNumber === "object"
            ? `${user.phoneNumber.countryCode} ${user.phoneNumber.number}`
            : user.phoneNumber,
        email: user.email,
        Designation: user.designation,
        JoinDate: new Date(user.createdAt).toLocaleDateString(),
      }));

      setData(formattedUsers);
    }, search, sort);
  }, [search, sort]);

  console.log("users", data);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        boxShadow: "3px 3px 8px #888888",
        borderRadius: "10px",
      }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{ fontWeight: "bold", fontSize: "20px" }}
                colSpan={6}
              >
                User Info
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  sx={{ fontWeight: "bold", fontSize: "16px" }}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                  {columns.map((column) => {
                    const value =
                      column.id === "phoneNumber" &&
                      typeof row[column.id] === "object"
                        ? `${row[column.id].countryCode} ${
                            row[column.id].number
                          }`
                        : row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {typeof value === "object"
                          ? JSON.stringify(value)
                          : value || "N/A"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
