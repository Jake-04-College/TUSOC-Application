await db.collection("SocietyInformation").updateOne(
  { _id: new ObjectId(societyId) },
  {
    $set: {
      Soc_Name,
      Soc_Desc,
      Soc_Campus,
      Soc_Category,
      Soc_Logo,
      Soc_Banner,
    }
  }
);