import CategoryItem from "../components/CategoryItem";
import { ICategory } from "../lib/interfaces";

const categories: ICategory[] = [
	{ href: "/kurtas", name: "Kurtas", imageUrl: "/kurtas.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/t-shirts.jpg" },
	{ href: "/perfumes", name: "Perfumes", imageUrl: "/perfumes.jpg" },
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  { href: "/shirtss", name: "Shirts", imageUrl: "/shirts.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
];

const HomePage = () => {
  return (
    <div className='relative min-h-screen text-white overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>
					Explore Our Categories
				</h1>
        <p className='text-center text-xl text-gray-300 mb-12'>
					Discover the latest trends in eco-friendly fashion
				</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>
      </div>
    </div>
  )
}

export default HomePage