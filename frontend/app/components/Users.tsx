"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useUser from "../api/user.api";
interface Data {
  name: string;
  phoneNumber: string;
  email: string;
  Designation: string;
  JoinDate: string;
  role: string;
  id: string;
}

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

export default function ColumnGroupingTable({ search, sort }) {
  const URL = "http://localhost:5000";
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Data[]>([]);
  const userAuthToken = localStorage.getItem("token");
  const router = useRouter();
  const { removeUserApi } = useUser();
  useEffect(() => {
    fetchUsers();
  }, [search, sort, page, rowsPerPage]);

  const removeHandler = (id) => {
    removeUserApi(id);
  };
  const fetchUsers = async () => {
    try {
      const params = {
        searchFromEmail: search || undefined,
        field: sort || "email",
        skip: Number(page) * Number(rowsPerPage),
        limit: Number(rowsPerPage),
      };
      const response = await axios.get(`${URL}/users`, {
        params,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });

      if (response.status === 200) {
        const formattedUsers = response.data.data.map((user: any) => ({
          name: `${user.userName.firstName} ${user.userName.lastName}`,
          phoneNumber:
            typeof user.phoneNumber === "object"
              ? `${user.phoneNumber.countryCode} ${user.phoneNumber.number}`
              : user.phoneNumber,
          email: user.email,
          Designation: user.designation,
          JoinDate: new Date(user.createdAt).toLocaleDateString(),
          id: user._id,
          // role: user.roles ? user.roles.join(", ") : "N/A",
        }));

        setData(formattedUsers);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/");
        }
        console.log(error?.response?.data?.message || "Login failed");
      } else {
        console.log("An unexpected error occured");
      }
    }
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
                colSpan={8}
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
            {data.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                {columns.map((column) => {
                  const value = row[column.id] || "N/A";
                  return (
                    <TableCell key={column.id} align={column.align || "left"}>
                      {value}
                    </TableCell>
                  );
                })}

                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeHandler(row.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
                <TableCell>
                  <Link
                   href={`/admin/${row.email}`}
                   className="bg-[#D5472E] shadow-sm shadow-black text-white px-10 py-3 rounded-md"
                  >
                    INFO
                  </Link>
                </TableCell>
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
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Paper>
  );
}
