export class File {
	name: String
	full_name: string
	size: number
	parent: Directory
	
	constructor (name: string, full_name: string, size: number, parent: Directory) {
		this.name = name
		this.full_name = full_name
		this.size = size
		this.parent = parent
	} 

	print(indent: number) {
		console.log('--'.repeat(indent) + `${this.full_name} ${this.size}`)
	}
}

export class Directory {
	name: string
	full_name: string
	parent?: Directory
	contents: File[]
	children: Directory[]

	constructor (name: string, full_name: string, parent?: Directory) {
		this.name = name
		this.full_name = full_name
		this.contents = []
		this.children = []		
		if (parent !== undefined) {
			this.parent = parent
		} 
	}
	
	getSize(): number {
		let sum = 0

		for (const dir of this.children) {
			sum += dir.getSize()
		}

		for (const file of this.contents) {
			sum += file.size
		}
		
		return sum
	}

	changeDirectory(destination: string, root: Directory): Directory {
		if (destination == '/') {
			return root
		} else if (destination === '..') {
			if (this.parent !== undefined) {
				return this.parent
			} else {
				throw new Error(`Cannot step out of root.`)
			}
		} else {
			let child = this.children.find(dir => dir.name === destination)
			if (child !== undefined) {
				return child
			} else {
				throw new Error(`No child directory ${destination} exists in ${this.full_name}`)
			}
		}
	}

	addChildDirectory(name: string) {
		const dir = new Directory(name, this.full_name + '/' + name, this)
		this.children.push(dir)
	}

	addFile(item: string[]) {
		const file = new File(item[1], this.full_name + '/' + item[1], parseInt(item[0]), this)
		this.contents.push(file)
	}

	print(indent: number) {
		console.log('  '.repeat(indent) + this.full_name)
		for (const file of this.contents) {
			file.print(indent + 1)
		}
		for (const dir of this.children) {
			dir.print(indent + 1)
		}
	}
}

export const readOutputIntoDirectory = (output: string): Directory => {
	let root = new Directory('/', '')
	let cwd = root
	for (const line of output.split('\n')) {
		if (line.startsWith('$') && line.includes('cd')) {
			cwd = cwd.changeDirectory(line.split(' ')[2], root)
		} else {
			const line_item = line.split(' ')
			if (line_item[0] === 'dir') {
				cwd.addChildDirectory(line_item[1])
			} else if (line_item[0] !== '$' && line !== "") {
				cwd.addFile(line_item)
			}
		}
	}
	return root
}

export const sumDirectoriesSmallerThan = (root: Directory, size: number): number => {
	let sum = 0
	if (root.getSize() < size) {
		sum += root.getSize()
	}
	for (const dir of root.children) {
		sum += sumDirectoriesSmallerThan(dir, size)
	}
	return sum
}

export const findSmallestDirectorySizeLargerThan = (root: Directory, size: number): number => {
	let smallest: number
	let root_size = root.getSize()
	if (root_size > size) {
		smallest = root_size
	} else {
		smallest = 70000000
	}
	for (const dir of root.children) {
		let next_smallest = findSmallestDirectorySizeLargerThan(dir, size)
		if (next_smallest < smallest) {
			smallest = next_smallest
		}
	}
	return smallest
}
