import Link from "next/link";

export default function admin() {
    return (
     <div className="flex gap-5">
<button>add</button>
<Link href={"/Admin/Management"}><button>Management</button></Link>
<button>lists</button>
     </div>
    );
  }
  