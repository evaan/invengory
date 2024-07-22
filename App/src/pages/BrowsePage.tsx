import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';

export default function BrowsePage() {
    const items = {
        root: {
            index: 'root',
            isFolder: true,
            children: ['child1', 'child2'],
            data: 'Root item',
        },
            child1: {
                index: 'child1',
                children: [],
                data: 'Child item 1',
        },
            child2: {
                index: 'child2',
                isFolder: true,
                children: ['child3'],
                data: 'Child item 2',
        },
            child3: {
                index: 'child3',
                children: [],
                data: 'Child item 3',
        },
    };
    
    const dataProvider = new StaticTreeDataProvider(items, (item, newName) => ({ ...item, data: newName }));
    
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
                        viewState={{}}
                        canDragAndDrop={false}
                        canDropOnFolder={false}
                        canReorderItems={false}
                        disableMultiselect={true}
                        >
                        <Tree treeId="tree-2" rootItem="root" />
                    </UncontrolledTreeEnvironment>
                </Box>
                <TableContainer w="70%" ml="8px">
                    <Table variant='simple'>
                        <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Stock</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        <Tr>
                            <Td></Td>
                            <Td>Raspberry Pi 4 Model B</Td>
                            <Td isNumeric textColor="#ff8986">0</Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td>eSun Blue Filament</Td>
                            <Td isNumeric>6</Td>
                        </Tr>
                        <Tr>
                            <Td></Td>
                            <Td>Jonesy Vertical Profiler</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Flex>
        </>
    )
}