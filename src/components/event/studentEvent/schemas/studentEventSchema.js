import * as Yup from "yup";

export const studentEventSchema = Yup.object({
 
  student_email: Yup.string().email().required("Please enter your password"),
  college_name:Yup.string().required("Please enter your designation"),
  participating_sports:Yup.array().min(1,"select at least one college"),
  // participating_sports:Yup.string().required("select at least one college"),
  

});