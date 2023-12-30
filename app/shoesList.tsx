import { FlatList, ListRenderItem, View } from "react-native";
import ProductCard from "./productCard";
import { ProductType } from "../store/interfaces";
import { client } from "../lib/sanity.server";
import { useEffect, useState } from "react";
import { urlForImage } from "../lib/sanity";
// const shoes = [
//   {
//     id: 1,
//     name: "Nike Dunk Low Retro",
//     price: 119.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/chaussure-dunk-low-retro-pour-dd36JB.png",
//     gender: "male",
//     description: `Créée pour les parquets mais revisitée pour le quotidien, la Nike Dunk Low Retro est de retour avec des renforts épurés et ses couleurs d'origine évoquant les équipes universitaires. Cette chaussure de basketball emblématique évoque les années 80 avec son empeigne en cuir premium stylée et incroyablement souple. Grâce à la technologie des chaussures modernes, le 21e siècle fait la part belle au confort.`,
//     category: "shoe",
//     sub_category: "Chaussure",
//   },
//   {
//     id: 2,
//     name: "Nike Air Max Plus",
//     price: 189.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a745d867-d022-4860-9e0a-45661fc7f9da/chaussure-air-max-plus-pour-zjzVSG.png",
//     gender: "male",
//     description: `Libère ton côté rebelle avec la Air Max Plus, un modèle Air novateur qui assure une stabilité et un amorti exceptionnels. Le dégradé de couleurs et les lignes de design ondulées garantissent un style affirmé. La construction respirante et les unités Max Air à l'avant-pied et au talon apportent un confort léger.`,
//     category: "shoe",
//     sub_category: "Chaussure",
//   },
//   {
//     id: 3,
//     name: "Nike P-6000",
//     price: 109.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b658ea0a-0dae-4017-9578-d1325dbf7e6f/chaussure-p-6000-9v7CCf.png",
//     gender: "male",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description: `Mélangeant des éléments d'anciennes sneakers Pegasus, la Nike P-6000 fait entrer le running du début des années 2000 dans la modernité. Équipée de mesh et de renforts respirants et affichant des lignes sportives, elle offre l'alliance parfaite du style et du confort. De plus, son amorti en mousse assure une posture surélevée et inspirée des pistes ainsi qu'un amorti incroyable.`,
//   },
//   {
//     id: 4,
//     name: "Nike Dunk Low",
//     price: 129.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c6409850-3171-4f91-b87c-b2e749f49de0/chaussure-dunk-low-pour-RLDm4t.png",
//     gender: "female",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description: `Conçue pour les parquets mais adoptée par le streetwear, l'icône du basket des années 80 fait son grand retour avec des détails classiques et un style rétro inspiré du terrain. Les renforts en daim souple apportent une touche vintage à cette Nike Dunk, et le col bas rembourré te permet de la porter partout, dans le plus grand confort.`,
//   },
//   {
//     id: 5,
//     name: "Nike Tech Hera",
//     price: 109.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a917b369-a445-4ecc-8bef-a9c6f1b7e90a/chaussure-tech-hera-pour-tHFxT1.png",
//     gender: "female",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description: `Tu cherches une sneaker imposante ? Opte pour la Tech Hera, une chaussure inspirée du running du début des années 2000. La semelle intermédiaire ondulée surélevée et les détails en daim te font gagner de la hauteur dans un confort absolu. La conception résiste à merveille au quotidien. Et ça tombe bien, car tu voudras certainement porter ce modèle tous les jours.`,
//   },
//   {
//     id: 6,
//     name: "Nike Air Max Plus",
//     price: 189.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/00bb15dd-4e67-4cac-b684-bbcbf0c25a28/chaussure-air-max-plus-pour-LWzXNs.png",
//     gender: "female",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description: `Revendique ton côté rebelle avec ce modèle Air novateur qui offre une stabilité optimale et un amorti exceptionnel. Avec son style classique des années 90, son mesh respirant et ses lignes inspirées de la nature, cette chaussure affiche un style provocant et confortable.`,
//   },

//   {
//     id: 8,
//     name: "Nike Full Force Low",
//     price: 64.97,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/04425b06-e340-44c4-92af-0d5aa87b7949/chaussure-full-force-low-pour-1nLQjz.png",
//     gender: "male",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description: `Une nouvelle chaussure avec un esprit rétro : le rêve est devenu réalité. Le design épuré renvoie à la AF1 classique, avec des coutures visibles et des couleurs inspirées de l'université qui lui donnent un style années 80. Mais qui dit qu'on doit rester rétro jusqu'au bout ? Confortable et résistante comme les modèles d'aujourd'hui, elle te suivra partout, tout le temps. C'est parti !`,
//   },
//   {
//     id: 9,
//     name: "Nike Air Force 1 Mid By You",
//     price: 149.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png",
//     gender: "male",
//     category: "shoe",
//     sub_category: "Chaussure",

//     description:
//       "Fais briller ton modèle avec du satin, reste classique avec du tissu, ou opte pour le luxe avec du cuir. Peu importe ce que tu choisis, ces AF1 sont faites pour toi. Avec ses 12 couleurs au choix et sa semelle en caoutchouc supplémentaire en option, ce modèle est conçu pour être unique, comme toi.",
//   },
//   {
//     id: 10,
//     name: "Nike Air Force 1 '07 LV8",
//     price: 129.99,
//     image:
//       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8773c4a4-602a-445e-9f2e-24f77676fa7a/chaussure-air-force-1-07-lv8-pour-ggb31G.png",
//     gender: "male",
//     category: "shoe",
//     sub_category: "Chaussure",
//     description:
//       "La légende perdure avec la Nike Air Force 1 '07 LV8. Alliant le confort d'une sneaker taillée pour les parquets et le style d'une chaussure du quotidien, ce modèle revisite un classique du basket. Les renforts en daim doux s'associent à la conception des années 80 et aux Swoosh réfléchissants pour vous offrir un style résolument basket, et les unités Air dissimulées sur toute la longueur apportent le confort légendaire que vous connaissez et aimez tant.",
//   },
// ];

const ShoesList = () => {
  const [shoes, setShoes] = useState<any>([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == 'product' && references(*[_type=="category" && name == 'shoes' ]._id)  && references(*[_type=="gender" && name == 'male' ]._id)]`
      )
      .then((res) => {
        setShoes(res);
      });
  }, []);

  // const renderItem: ListRenderItem<ProductType> = ({ item }) => (
  //   <ProductCard
  //     id={item._id}
  //     name={item.name}
  //     price={item.price}
  //     image={urlForImage(item.image).url()}
  //     gender={item.gender}
  //     description={item.description}
  //     category={item.category}
  //     sub_category={item.sub_category}
  //   />
  // );

  const itemData = shoes.map((item: any) => (
    <ProductCard
      id={item._id}
      name={item.name}
      price={item.price}
      image={urlForImage(item.image).url()}
      gender={item.gender}
      description={item.description}
      category={item.category}
      sub_category={item.sub_category}
    />
  ));

  return (
    <View className="flex-1 bg-white">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={itemData}
        renderItem={({ item }) => item}
        numColumns={2}
        columnWrapperStyle={{
          flexDirection: "row",
          gap: 5,
          paddingVertical: 15,
        }}
      />
    </View>
  );
};

export default ShoesList;
