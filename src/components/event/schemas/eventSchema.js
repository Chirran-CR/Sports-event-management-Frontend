import * as Yup from "yup";

export const eventSchema = Yup.object({
  event_name: Yup.string().min(2).required("Please enter the event name"),
  teacher_email: Yup.string().email().required("Please enter your password"),
  hosting_clg:Yup.string().required("Please enter your designation"),
  participating_clg:Yup.array().min(1,"select at least one college"),
  venue:Yup.string().required("Venue should be there"),
  sports_category:Yup.array().min(1,"select at least one category"),

});