import * as Yup from "yup";

export const studentEventSchema = Yup.object({
 
  // student_email: Yup.string().email().required("Please enter your email"),
  college_name:Yup.string(),
  participating_sports:Yup.array().min(1,"select at least one college"),
  // participating_sports:Yup.string().required("select at least one college"),
  

});