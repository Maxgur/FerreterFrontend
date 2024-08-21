import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { useFetch } from "../../hooks/apiConsult";
import "../AcordeonMenu/AcordeonMenu.css"

export function Acordion({ url ,onSubcategoryClick}) {
  const endUrlcat = "categories/";
  const endUrlsubcat = "subcategories/";

  const { data: categories, isPending: isPendingCat, error: catError } = useFetch(url + endUrlcat);
  const { data: subcategories, isPending: isPendingSubcat, error: subcatError } = useFetch(url + endUrlsubcat);

  if (isPendingCat || isPendingSubcat) {
    return <div>Loading...</div>;
  }

  if (catError || subcatError) {
    return <div>Error: {catError?.statusText || subcatError?.statusText}</div>;
  }

  if (!categories || !subcategories) {
    return <div>No data available</div>;
  }

  return (
    <div className="accordion-container ">
      <Accordion className="h-full bg-white shadow-md p-5">
      {categories.map((category) => (
        <AccordionPanel key={category.id}>
          <AccordionTitle>{category.name}</AccordionTitle>
          <AccordionContent>
            <ul>
              {subcategories
                .filter((subcat) => subcat.category === category.id)
                .map((subcat) => (
                  <li
                    key={subcat.id}
                    className="mb-2 text-gray-700 dark:text-gray-400 hover:bg-gray-200 hover:text-gray-900 hover:font-semibold hover:py-2 hover:px-4 hover:rounded hover:cursor-pointer hover:shadow-md"
                    onClick={()=>onSubcategoryClick(subcat.id)}
                  >
                    {subcat.name}
                    
                  </li>
                ))}
            </ul>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
    </div>
  );
}