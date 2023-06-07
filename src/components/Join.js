// import React from "react";
// import Button from "@mui/material/Button";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import TextField from "@mui/material/TextField";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { Link } from "react-router-dom";

// const Join = () => {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <Card className="card">
//         <CardContent>
//           <h2> Please Enter the Room Id</h2>
//           <form onSubmit={handleSubmit}>
//             <TextField
//               type="alphanumeric"
//               label="Room id"
//               variant="outlined"
//               fullWidth
//               inputProps={{ inputMode: "numeric" }}
//             />
//             {/* <Button type="submit" variant="contained">
//             <Link to="/home" className="linkto">
//             Back
//             </Link>
//             </Button>
//             <Button type="submit" variant="contained">
//               Join
//             </Button> */}
//             <div className="buttonsDiv">
//               <Button
//                 className="button1"
//                 style={{ marginBottom: "1rem" }}
//                 type="submit"
//                 variant="contained"
//               >
//                 <Link to="/playground" className="linkto">
//                   Join
//                 </Link>
//               </Button>
//               {/* <Button type="submit" variant="contained">
//               Back
//             </Button> */}
//               <Button
//                 className="button1"
//                 style={{ marginBottom: "1rem" }}
//                 type="submit"
//                 variant="contained"
//               >

//               <Link to="/home" className="linkto">
//                 Back
//               </Link>
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Join;



import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const Join = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic if needed

    // Navigate to the next page
    navigate("/playground"); // Replace "/playground" with the desired URL of the next page
  };

  return (
    <div>
      <Card className="card">
        <CardContent>
          <h2> Please Enter the Room Id</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              type="alphanumeric"
              label="Room id"
              variant="outlined"
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />
            <div className="buttonsDiv">
              <Button
                className="button1"
                style={{ marginBottom: "1rem" }}
                type="submit"
                variant="contained"
              >
                Join
              </Button>
              <Button
                className="button1"
                style={{ marginBottom: "1rem" }}
                type="button"
                variant="contained"
                onClick={() => navigate("/home")}
              >
                Back
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Join;
