import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import { useEffect, useState } from "react";
import { Category } from "../api/types";

export default function BrowsePage() {
    const [categories, setCategories] = useState<{ [int: number]: TreeItem }>({});
    const [category, setCategory] = useState<number>(-1);
    const [parts, setParts] = useState<PartWithStock[]>([]);
    
    interface TreeItem {
        index: number;
        isFolder: boolean;
        children: number[];
        data: string;
    }

    interface PartWithStock {
        id: number;
        name: string;
        categoryID: number;
        totalStock: number;
    }

    function parseCategory(category: Category): { [int: number]: TreeItem } {
        let output: { [int: number]: TreeItem } = {};
        output[category.ID] = {index: category.ID, isFolder: category.ChildCategories.length > 0, children: [], data: category.Name}
        category.ChildCategories.forEach((childCategory => {
            output[category.ID].children.push(childCategory.ID);
            output = {...output, ...parseCategory(childCategory)}
        }));
        return output;
    }

    useEffect(() => {
        fetch("/api/categories").then((response) => response.json()).then((data) => {
            let output: { [int: number]: TreeItem } = {};
            output[0] = { index: 0, isFolder: true, data: "root", children: [-1] }
            data.forEach((category: Category) => {
                output = {...output, ...parseCategory(category)}
            });
            output[-1] = { index: -1, isFolder: true, data: "All Components", children: data.map((category: Category) => category.ID) }
            setCategories(output);
        });
        fetch("/api/parts").then((response) => response.json()).then((data) => {
            const parts: PartWithStock[] = [];
            data.forEach((part: PartWithStock) => {
                parts.push(part);
            });
            setParts(parts);
            console.log(parts);
        });
    }, []);

    const dataProvider = new StaticTreeDataProvider(categories, (item, newName) => ({ ...item, data: newName }));
    
    return (
        <>
            <Navbar />
            <Flex>
                <InputGroup mx="8px">
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input colorScheme="blue" placeholder='Search for items...' _placeholder={{opacity: "0.6", color: "#fff"}} />
                    <InputRightElement w="64px">
                        <Button colorScheme="blue" variant="ghost">Filters</Button>
                    </InputRightElement>
                </InputGroup>
                <Button colorScheme="green" w="25%" mr="8px"><Center><AddIcon mr="4px" /> Add Item</Center></Button>
            </Flex>
            <Flex>
                <Box w="30%">
                    <UncontrolledTreeEnvironment
                        dataProvider={dataProvider}
                        getItemTitle={item => item.data}
                        viewState={{
                            ["tree"]: {
                                expandedItems: [-1], 
                                selectedItems: [-1]
                            }
                        }}
                        canDragAndDrop={false}
                        canDropOnFolder={false}
                        canReorderItems={false}
                        disableMultiselect={true}
                        onSelectItems={(items) => setCategory(Number(items[0]))}
                        >
                        <Tree treeId="tree" rootItem="0" />
                    </UncontrolledTreeEnvironment>
                </Box>
                <TableContainer w="70%" ml="8px">
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Category</Th>
                            <Th isNumeric>Stock</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {
                                parts.filter((part: PartWithStock) => category == -1 || part.categoryID === category).map((part: PartWithStock) => {
                                    return(
                                        <Tr>
                                            <Td>{part.name}</Td>
                                            <Td>{categories[part.categoryID].data}</Td>
                                            <Td isNumeric textColor={part.totalStock == 0 ? "#ff8986" : "unset"}>{part.totalStock}</Td>
                                        </Tr>
                                    )
                                })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    )
}