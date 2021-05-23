import React from "react";
import Link from "next/link";

export default function Print(props) {
  console.log(props);
  return (
    <Link href={`/product/${props.slug}`} replace>
      <a
        className={`print print_${props.index}`}
        style={{ backgroundImage: `url(${props.sourceUrl})` }}
      ></a>
    </Link>
  );
}
